import { exec } from '@actions/exec'
import { context, getOctokit } from '@actions/github'
import { setFailed, info, getInput } from '@actions/core'
import { randomUUID } from 'crypto'

const GITHUB_TOKEN = getInput('token')
if (!GITHUB_TOKEN) {
  setFailed('Error: GITHUB_TOKEN could not be retrieved.')
}

export const gitSetConfig = async () => {
  info('Setting git config...')
  // TODO: Get command user info from
  // const { rest } = getOctokit(GITHUB_TOKEN)
  // const { data: user } = await rest.users.getAuthenticated()
  const user = {
    name: 'github-actions[bot]',
    email: '41898282+github-actions[bot]@users.noreply.github.com',
  }

  await exec('git', ['config', 'user.name', user.name])
  await exec('git', ['config', 'user.email', user.email])
}

export const gitCheckout = async () => {
  info('Checking out...')

  const {
    rest: { pulls },
  } = getOctokit(GITHUB_TOKEN)
  const {
    data: {
      head: { ref: branch },
    },
  } = await pulls.get({
    ...context.repo,
    pull_number: context.issue.number,
  })

  await exec('git', ['fetch', 'origin', branch])
  await exec('git', ['checkout', branch])

  return branch as string
}

export const gitCreateBranch = async () => {
  info('Creating branch...')
  const branch = `gt${context.issue.number}-${randomUUID()}`

  await exec('git', ['checkout', '-b', branch])
  return branch
}

export const gitCommitPush = async (branch: string, filePath: string) => {
  info('Committing and pushing...')

  await exec('git', ['add', filePath])
  await exec('git', ['commit', '-m', `💬Generate LLM translations`])
  await exec('git', ['push', 'origin', branch])
}

export const gitCreatePullRequest = async (
  head: string,
  title: string,
  body: string,
) => {
  const {
    rest: { pulls, repos },
  } = getOctokit(GITHUB_TOKEN)
  const {
    data: { default_branch: base },
  } = await repos.get(context.repo)

  info(`Creating pull request from ${base} to ${head}...`)

  await pulls.create({
    ...context.repo,
    head,
    base,
    title,
    body,
  })
}

export const gitPostComment = async (message: string) => {
  const {
    rest: { issues },
  } = getOctokit(GITHUB_TOKEN)

  await issues.createComment({
    ...context.repo,
    issue_number: context.issue.number,
    body: message,
  })
}

export const authorizeUser = async () => {
  const {
    rest: { repos },
  } = getOctokit(GITHUB_TOKEN)
  const { data: user } = await repos.getCollaboratorPermissionLevel({
    ...context.repo,
    username: context.actor,
  })

  info(`User permission: ${user.permission}`)

  return user.permission === 'admin' || user.permission === 'write'
}
