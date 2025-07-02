import CheckListItem from "./CheckListItem"
import './checkList.css'


function CheckList({data, onChacked, checked, contType, type}) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-wrap gap-2 justify-center">
                {data.map(item => <CheckListItem key={item.id} data={item} onChacked={onChacked} checked={checked} type={type} />)}
            </div>
        </div>
    )
}

export default CheckList
