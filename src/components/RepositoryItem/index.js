import './index.css'

const RespositoryItem = props => {
  const {list} = props
  const {name, forksCount, issuesCount, StartCount, AvatarUrl} = list

  return (
    <li className="bg-color">
      <img className="img-list" src={AvatarUrl} alt={name} />
      <h1 className="heading_section">{name}</h1>
      <div className="flex-item-arrange">
        <img
          className="start-img"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{`${StartCount} starts`}</p>
      </div>

      <div className="flex-item-arrange">
        <img
          className="start-img"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{`${forksCount} forks`}</p>
      </div>
      <div className="flex-item-arrange">
        <img
          className="start-img"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
        />
        <p>{`${issuesCount} open issues`}</p>
      </div>
    </li>
  )
}

export default RespositoryItem
