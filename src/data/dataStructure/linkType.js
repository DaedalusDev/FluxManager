import * as rules from '../rules'
import _ from 'lodash'

export default {
  id: {
    type: Number,
    label: 'Numero descripteur',
    format: (v) => _.padStart(v, 5, '0')
  },
  nom: {
    type: String,
    label: 'Nom',
    required: true,
    rules: [
      rules.required
    ]
  },
  linkedEntities: {
    type: Array,
    label: 'Entités liées',
    _source: 'manager',
    _target: 'links',
    _inversedBy: 'linksType'
  }
}
