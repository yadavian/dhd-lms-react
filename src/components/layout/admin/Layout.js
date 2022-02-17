import React from 'react'
import { Footer } from '../admin/Footer'
import { Header } from '../admin/Header'
import { SideMenu } from '../admin/SideMenu'

export const Layout = ({ children }) => {
    return (
        <>
            <div id="page-top">
                <div id="wrapper">
                    <SideMenu />

                    <div class="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                            <Header />
                            {/* Pages */}
                            <div class="container-fluid">{children}</div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>

    )
}
