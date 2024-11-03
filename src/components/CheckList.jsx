import CheckListItem from "./CheckListItem"
import './checkList.css'


function CheckList({data, onChacked, checked, contType, type}) {
    return (
        <div className="px-2 flex flex-col">
            <label className="text-2xl self-center lg:self-start font-bold">{contType}</label>
            <div className=" flex flex-col flex-wrap gap-2 mt-3">
            {data.map(gen => <CheckListItem key={gen.id} data={gen} onChacked={onChacked} checked={checked} type={type} />)}
            </div>
        </div>
    )
}

export default CheckList
