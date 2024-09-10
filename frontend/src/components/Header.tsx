import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";

type Props={
    lightmode:boolean,
    setLightmode: React.Dispatch<React.SetStateAction<boolean>>
}

const Header:React.FC<Props>= ({lightmode,setLightmode} :Props) => {

  const handleMode = () =>{
    setLightmode(!lightmode)
  }


  const theme = lightmode ? "Light":"Dark"
  useEffect(() => {
    document.documentElement.setAttribute("data-theme",theme)
    toast.success(`${theme} mode is activated`)
  },[lightmode])
  return (
    <div className='header'>
        <div>
          <h1 className='heading'>TODO</h1>
        </div>
        <div className='mode-set' onClick={handleMode}>
          {lightmode ? <GoSun size={30}/> : <IoMoonOutline size={30}/>}
        </div>
    </div>
  )
}

export default Header