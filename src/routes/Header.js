import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from '@chakra-ui/react';
import React from 'react';

const Header = () => {
    return (
        <>
            <Heading>검색 서비스</Heading>
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/demo'>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href='/demo/video'>Video</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href='/demo/book'>Book</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </>
    );
};

export default Header;