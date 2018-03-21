import EdiTable from './components/EdiTable/EdiTable'
import Expandable from './components/Expandable/Expandable'
import ChipsSelect from './components/FormFields/ChipsSelect'

function CoreComponents (Vue) {
  Vue.component(EdiTable.name, EdiTable)
  Vue.component(Expandable.name, Expandable)
  Vue.component(ChipsSelect.name, ChipsSelect)
}

export default CoreComponents
