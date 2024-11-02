import './checkListItem.css'


function CheckListItem({data, onChacked, checked, type}) {
    return (
        <div onClick={() => onChacked(type === 'lang' ? [...checked, data.shortname] : [...checked, data.id])} className="checkbox-wrapper-47">
            <input type="checkbox" name={data.id} checked={data.isChecked} id={`${data.name}-${data.id}`} />
            <label htmlFor={`${data.name}-${data.id}`}>{data.name}</label>
        </div>
    )
}

export default CheckListItem
