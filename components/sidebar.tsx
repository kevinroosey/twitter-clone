import { cn } from "@/lib/utils"


import { Button } from "./ui/button"
import { BellDotIcon, Home, HomeIcon, LucideHome, Search, SearchIcon } from "lucide-react"
import { GearIcon } from "@radix-ui/react-icons"



export function Sidebar({className}: any) {
  return (
    <div className="">
      <div className="">
        <div className="px-3 py-2 self-end">
          
          <div className="space-y-6 justify-end">
            <Button variant="secondary" className="w-full justify-start">
            <LucideHome className="mr-4 h-6 w-6"/>
            <p className="text-xl">Home</p>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <SearchIcon className="mr-4 h-6 w-6"/>
              <p className="text-xl">Search</p>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BellDotIcon className="mr-4 h-6 w-6"/>
              <p className="text-xl">Notifications</p>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <GearIcon className="mr-4 h-6 w-6"/>
              <p className="text-xl">Settings</p>
            </Button>
          </div>
        </div>
        
          
        
      </div>
    </div>
  )
}