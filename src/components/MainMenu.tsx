import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useNavigate } from "react-router-dom";

export function MainMenu() {
  const navigate = useNavigate();

  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
      <MenubarMenu>
        <MenubarTrigger className="font-bold">File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Profile <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open... <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Export Data... <MenubarShortcut>⌘E</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-bold">Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⌘Y</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Cut <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copy <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Paste <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-bold">View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => navigate("/")}>
            Dashboard
          </MenubarItem>
          <MenubarItem onClick={() => navigate("/skills")}>
            Skills Profile
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Zoom In <MenubarShortcut>⌘+</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Zoom Out <MenubarShortcut>⌘-</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-bold">Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Documentation</MenubarItem>
          <MenubarItem>Support</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>About TalentFund</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}