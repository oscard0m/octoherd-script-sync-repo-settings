//@ts-check

let templateRepositoryOptions;

/**
 * Updates repository options based on a settings from a template repository
 *
 * @param {import('@octoherd/cli').Octokit} octokit
 * @param {import('@octoherd/cli').Repository} repository
 * @param { {template: string} } options Custom user options passed to the CLI
 */
export async function script(octokit, repository, options) {
  if (!options.template) {
    throw new Error(`--template is required`);
  }

  try {
    if (!templateRepositoryOptions) {
      octokit.log.debug(
        "Load Repository Options from template repository %s",
        options.template
      );

      const [templateOwner, templateRepo] = options.template.split("/");

      try {
        const {
			data: { 
				allow_merge_commit,
				allow_rebase_merge,
				allow_squash_merge,
				delete_branch_on_merge 
			}
        } = await octokit.request("GET /repos/{owner}/{repo}", {
          owner: templateOwner,
          repo: templateRepo,
        });

        templateRepositoryOptions = {
			allow_merge_commit,
			allow_rebase_merge,
			allow_squash_merge,
			delete_branch_on_merge 
		};
      } catch (error) {
        if (error.status === 404) {
          throw new Error(`Repository Template %s not found`);
        }

        throw error;
      }

      octokit.log.info(
        templateRepositoryOptions,
        "Repository Options loaded from %s",
        options.template
      );
    }

    const urlParameters = {
      owner: repository.owner.login,
      repo: repository.name,
      name: repository.name
    };

    await octokit.request('PATCH /repos/{owner}/{repo}',
      {
        ...urlParameters,
        ...templateRepositoryOptions,
      }
    );
  } catch (error) {
	const statusCode = error.status;

    if (statusCode === 401) {
		octokit.log.warn(
			"Token does not have permission to access repository %s.",
			repository.full_name
		  );
		  return;
	} else if(statusCode === 403) {
		octokit.log.warn(
			"Repository %s is archived.",
			repository.full_name
		  );
		  return;
	} else if (statusCode === 404) {
      octokit.log.info(
        "Respository %s not found",
        repository.full_name
      );
      return;
    }

    throw error;
  }
}