export const setGithubToken = (token) =>
{
    return {
        type: Actions.SET_GITHUB_TOKEN,
        token
    }
}
export const resumeGithubToken = () =>
{
    return {
        type: Actions.RESUME_GITHUB_TOKEN
    }
}

export const initGithubApi = () =>{
    return{
        type: Actions.INIT_GITHUB_API
    }
}
export const Actions ={
    SET_GITHUB_TOKEN: "SET_GITHUB_TOKEN",
    RESUME_GITHUB_TOKEN: "RESUME_GITHUB_TOKEN",
    INIT_GITHUB_API: "INIT_GITHUB_API"
}