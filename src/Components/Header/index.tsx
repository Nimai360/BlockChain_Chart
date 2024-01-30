import { useState } from "react";
// import "./style.scss";
import Logo from "../../assets/img/Group 1845.svg";
import Help from "../../assets/icon/help-circle-contained.svg";
import Settings from "../../assets/icon/settings.svg";
import Avatar_profile from "../../assets/img/avatar-profile.jpg";
import { Avatar } from "@material-tailwind/react";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const Header: React.FC = () => {
  const [openMenuProfile, setOpenMenuProfile] = useState<boolean>(false);
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);

  return (
    <>
      <header className="m-0 p-0 w-full h-14 px-6 py-6 flex items-center text-white font-inter text-sm leading-snug font-semibold bg-primary_500_brand">
        <div className="m-0 p-0 w-full flex justify-between">
          <div className="m-0 p-0 flex items-center gap-8">
            <img
              className="m-0 p-0 logo cursor-pointer"
              src={Logo}
              alt="logo"
            />
            <span className="mr-2 cursor-pointer">Boards</span>
              <Button
                placeholder=""
                variant="text"
                className="hover:bg-transparent active:bg-transparent focus:bg-transparent w-auto px-0 flex items-center gap-3 capitalize tracking-normal text-white_color font-inter text-sm leading-snug font-semibold"
              >
                Reports{" "}
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform `}
                />
              </Button>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div color="transparent" className="cursor-pointer">
              <img src={Help} alt="Help button" />
            </div>
            <div color="transparent" className="cursor-pointer">
              <img src={Settings} alt="Settings button" />
            </div>
            <div className="flex w-max gap-2 items-center">
              <Avatar
                placeholder=""
                src={Avatar_profile}
                alt="avatar"
                size="sm"
                className="cursor-pointer"
              />
              <Menu
                open={openMenuProfile}
                handler={setOpenMenuProfile}
                allowHover
              >
                <MenuHandler>
                  <Button
                    placeholder=""
                    variant="text"
                    className="w-auto px-0 flex items-center gap-3 capitalize tracking-normal text-white_color font-inter text-sm leading-snug font-semibold"
                  >
                    John Smith{" "}
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`h-3.5 w-3.5 transition-transform ${
                        openMenuProfile ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </MenuHandler>
                <MenuList
                  placeholder=""
                  className="shadow-none m-0 px-0 py-0 gap-[10px] text-neutral_800 w-[276px] border-solid border-neutral_300"
                >
                  <MenuItem
                    placeholder=""
                    className="flex items-start px-[10px] py-[10px] hover:text-primary_500_brand"
                  >
                    <Typography
                      placeholder=""
                      variant="small"
                      className="font-medium font-inter text-xs"
                    >
                      Organization settings
                    </Typography>
                  </MenuItem>
                  <Menu
                    placement="right-start"
                    open={openSubMenu}
                    handler={setOpenSubMenu}
                    allowHover
                    offset={15}
                  >
                    <MenuHandler className="flex items-center justify-between m-0 px-[10px]">
                      <MenuItem
                        placeholder=""
                        className="flex items-start px-[10px] py-[10px] hover:text-primary_500_brand"
                      >
                        <Typography
                          placeholder=""
                          variant="small"
                          className="font-medium font-inter text-xs"
                        >
                          Projects settings
                        </Typography>
                        <ChevronUpIcon
                          strokeWidth={2.5}
                          className={`h-3.5 w-3.5 transition-transform ${
                            openSubMenu ? "rotate-90" : ""
                          }`}
                        />
                      </MenuItem>
                    </MenuHandler>
                    <MenuList
                      placeholder=""
                      className="shadow-none m-0 px-0 py-0 gap-[10px] text-neutral_800 max-h-72 w-[205px] border-solid border-neutral_300"
                    >
                      <MenuItem
                        placeholder=""
                        className="flex items-start px-[10px] py-[10px] justify-center"
                      >
                        <Typography
                          placeholder=""
                          variant="small"
                          className="font-medium font-inter text-xs"
                        >
                          Projects (2)
                        </Typography>
                      </MenuItem>
                      <hr className="border-1/2 border-solid border-neutral_300" />
                      <MenuItem
                        placeholder=""
                        className="flex items-start px-[10px] py-[10px] hover:text-primary_500_brand"
                      >
                        <Typography
                          placeholder=""
                          variant="small"
                          className="font-medium font-inter text-xs"
                        >
                          ChainSkope
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        placeholder=""
                        className="flex items-start px-[10px] py-[10px] hover:text-primary_500_brand"
                      >
                        <Typography
                          placeholder=""
                          variant="small"
                          className="font-medium font-inter text-xs"
                        >
                          Project 2
                        </Typography>
                      </MenuItem>
                      <hr className="border-1/2 border-solid border-neutral_300" />
                      <MenuItem
                        placeholder=""
                        className="flex items-start px-[10px] py-[10px] justify-center hover:text-primary_500_brand text-neutral_700 bg-neutral_100"
                      >
                        <Typography
                          placeholder=""
                          variant="small"
                          className="font-medium font-inter text-xs"
                        >
                          Create project
                        </Typography>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  <MenuItem
                    placeholder=""
                    className="flex items-start px-[10px] py-[10px] hover:text-primary_500_brand"
                  >
                    <Typography
                      placeholder=""
                      variant="small"
                      className="font-medium font-inter text-xs"
                    >
                      Personal settings
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    placeholder=""
                    disabled
                    className="flex items-start px-[10px] py-[10px]"
                  >
                    <Typography
                      placeholder=""
                      variant="small"
                      className="font-medium font-inter text-xs"
                    >
                      Shortcuts
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    placeholder=""
                    className="flex items-start px-[10px] py-[10px] hover:text-primary_500_brand"
                  >
                    <Typography
                      placeholder=""
                      variant="small"
                      className="font-medium font-inter text-xs"
                    >
                      Data sources
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    placeholder=""
                    className="flex items-start px-[10px] py-[10px] hover:text-primary_500_brand"
                  >
                    <Typography
                      placeholder=""
                      variant="small"
                      className="font-medium font-inter text-xs"
                    >
                      Plan details and billing
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    placeholder=""
                    className="flex items-start px-[10px] py-[10px] hover:text-primary_500_brand"
                  >
                    <Typography
                      placeholder=""
                      variant="small"
                      className="font-medium font-inter text-xs"
                    >
                      Invite users
                    </Typography>
                  </MenuItem>
                  <hr className="border-1/2 border-solid border-neutral_300" />
                  <MenuItem
                    placeholder=""
                    className="flex items-start px-[10px] py-[10px] mb-[10px] hover:text-primary_500_brand"
                  >
                    <Typography
                      placeholder=""
                      variant="small"
                      className="font-medium font-inter text-xs "
                    >
                      Log out
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
