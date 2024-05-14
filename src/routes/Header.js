import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Heading,
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiFillSun, AiFillMoon } from "react-icons/ai";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <header>
                <Heading textAlign={"center"} size={"2xl"} mb={"20px"}>
                    <Icon as={FaSearch} /> 검색 서비스
                </Heading>
                <HStack justifyContent={"space-between"}>
                    <HStack>
                        <Button>
                            <Link to={"/"}>Home</Link>
                        </Button>
                        <Menu>
                            {({ isOpen }) => (
                                <>
                                    <MenuButton isActive={isOpen} as={Button}>
                                        Video
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem as={Button}>
                                            <Link to={"/video/list"}>추천 영상</Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link to={"/video/search"}>영상 검색</Link>
                                        </MenuItem>
                                    </MenuList>
                                </>
                            )}
                        </Menu>
                        <Menu>
                            {({ isOpen }) => (
                                <>
                                    <MenuButton isActive={isOpen} as={Button}>
                                        Book
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>
                                            <Link to={"/book/list"}>추천 도서</Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link to={"/book/search"}>도서 검색</Link>
                                        </MenuItem>
                                    </MenuList>
                                </>
                            )}
                        </Menu>
                    </HStack>
                    {colorMode === "light" ? (
                        <IconButton
                            icon={<AiFillMoon />}
                            onClick={toggleColorMode}
                            size={"lg"}
                        />
                    ) : (
                        <IconButton
                            icon={<AiFillSun />}
                            onClick={toggleColorMode}
                            size={"lg"}
                        />
                    )}
                </HStack>
            </header>
        </>
    );
};

export default Header;