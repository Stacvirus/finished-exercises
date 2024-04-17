import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { styles } from '../Styles'
const { Cancle, Btn } = styles

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  function handleVisibility() {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { handleVisibility }
  })

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Btn onClick={handleVisibility}>{props.btnLable}</Btn>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Cancle onClick={handleVisibility}>cancel</Cancle>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  btnLable: PropTypes.string.isRequired,
}
Togglable.displayName = 'Togglable'

export default Togglable
