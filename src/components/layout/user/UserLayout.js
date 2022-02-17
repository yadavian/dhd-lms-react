import React from 'react'
import { Footer } from '../admin/Footer'
import { Header } from '../admin/Header' 
import { UserSideMenu } from './UserSideMenu'

export const UserLayout = ({ children }) => {
    return (
        <>
            <div id="page-top">
                <div id="wrapper">
                    <UserSideMenu />

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
