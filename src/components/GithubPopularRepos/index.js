import './index.css'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const ApiStatus = {
  Inprogress: 'IN_progress',
  Failure: 'FAILURE',
  Success: 'SUCCESS',
}

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    apiStatus: '',
    apiStatusId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getGithubPopular()
  }

  failureView = () => (
    <div className="center">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  getGithubPopular = async () => {
    this.setState({apiStatus: ApiStatus.Inprogress})

    const {apiStatusId} = this.state

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${apiStatusId}`,
    )
    // console.log(response)
    if (response.ok === true) {
      const newData = await response.json()
      const UpdateList = newData.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        StartCount: each.stars_count,
        AvatarUrl: each.avatar_url,
      }))
      this.setState({reposList: UpdateList, apiStatus: ApiStatus.Success})
    } else {
      this.setState({apiStatus: ApiStatus.failureView})
    }
  }

  onGetRepositoryItem = () => {
    const {reposList} = this.state

    return (
      <div className="center">
        <ul>
          {reposList.map(each => (
            <RepositoryItem key={each.id} list={each} />
          ))}
        </ul>
      </div>
    )
  }

  onUpdataButtonStatus = id => {
    this.setState({apiStatusId: id}, this.getGithubPopular)
  }

  OnLanguageFilterItem = () => {
    const {apiStatusId} = this.state

    return (
      <div className="center">
        <ul className="ul">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              filter={each}
              isActive={each.id === apiStatusId}
              onUpdataButtonStatus={this.onUpdataButtonStatus}
            />
          ))}
        </ul>
      </div>
    )
  }

  LoadingView = () => (
    <div testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  OnGetStatusGithubResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case ApiStatus.Success:
        return this.onGetRepositoryItem()
      case ApiStatus.Failure:
        return this.failureView()
      case ApiStatus.Inprogress:
        return this.LoadingView()
      default:
        return ''
    }
  }

  render() {
    const {reposList} = this.state
    console.log(reposList)
    return (
      <div className="text-center">
        <h1>Popular</h1>
        {this.OnLanguageFilterItem()}
        {this.OnGetStatusGithubResult()}
      </div>
    )
  }
}

export default GithubPopularRepos
