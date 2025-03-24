import PropTypes from 'prop-types';
import styles from './Button.module.css';
function button({text}) {
    return <button className={styles.btn}>{text}</button>
}
button.propTypes = {
    text: PropTypes.string.isRequired
}
export default button;