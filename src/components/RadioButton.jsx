import styles from './radioButton.module.css'

function RadioButton({onChangeType}) {
    return (
        <div className={styles['hidden-toggles']}>	
            <input onChange={() => onChangeType(0)} name="coloration-level" type="radio" id="coloration-low" className={styles['hidden-toggles__input']} checked/>
            <label htmlFor="coloration-low" className={styles['hidden-toggles__label']}>ფილმი</label>
            
            <input onChange={() => onChangeType(1)} name="coloration-level" type="radio" id="coloration-medium" className={styles['hidden-toggles__input']}  />
            <label htmlFor="coloration-medium" className={styles['hidden-toggles__label']}>სერიალი</label>	        
        </div>
    )
}

export default RadioButton
