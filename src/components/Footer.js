import { useDispatch, useSelector } from "react-redux";
import { colorRemoved, colorSelected, statusChanged } from "../features/filters/filterSlice";

export default function Footer() {
    const dispatch = useDispatch();
    const {status, colors} = useSelector((state) => state.filters);
   





    const handleColorChange = (color) => {
        if (colors.includes(color)) {
          dispatch(colorRemoved(color));
        } else {
          dispatch(colorSelected(color));
        }
      };

      const handleStatusChanged = (status) =>{
       dispatch(statusChanged(status))
      }
    


    return (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
            <p>2 tasks left</p>
            <ul className="flex space-x-1 items-center text-xs">
                <li onClick={() => handleStatusChanged("All")} className="cursor-pointer font-bold">All</li>
                <li>|</li>
                <li onClick={() => handleStatusChanged("Incomplete")} className="cursor-pointer">Incomplete</li>
                <li>|</li>
                <li onClick={() => handleStatusChanged("Complete")}  className="cursor-pointer">Complete</li>
                <li></li>
                <li></li>
                <li onClick={()=> handleColorChange("green")} className="h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer bg-green-500"></li>
                <li onClick={()=> handleColorChange("red")} className="h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer"></li>
                <li onClick={()=> handleColorChange("yellow")} className="h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer"></li>
            </ul>
        </div>
    );
}
