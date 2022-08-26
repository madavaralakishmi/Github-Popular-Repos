import './index.css'

const LanguageFilterItem = props => {
  const {filter, isActive, onUpdataButtonStatus} = props
  const {language, id} = filter

  const ClassChange = isActive ? 'msg-change' : ''

  const onButtonStatus = () => {
    onUpdataButtonStatus(id)
  }

  return (
    <li className="ul li">
      <button
        type="button"
        className={`${ClassChange}`}
        onClick={onButtonStatus}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
