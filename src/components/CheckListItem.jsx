import './checkListItem.css'

function CheckListItem({data, onChacked, checked, type}) {
    const isChecked = type === 'lang' 
        ? checked.includes(data.shortname)
        : checked.includes(data.id);

    return (
        <div 
            onClick={() => onChacked(type === 'lang' ? [...checked, data.shortname] : [...checked, data.id])} 
            className={`filter-button ${isChecked ? 'selected' : ''}`}
        >
            {data.name}
        </div>
    )
}

export default CheckListItem
