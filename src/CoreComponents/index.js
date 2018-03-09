import EdiTable from './components/EdiTable/EdiTable'
import Expandable from './components/Expandable/Expandable'

function CoreComponents (Vue) {
  Vue.component(EdiTable.name, EdiTable)
  Vue.component(Expandable.name, Expandable)
}

export default CoreComponents
