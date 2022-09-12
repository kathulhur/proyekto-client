import React from 'react'
import ProjectsTable from '../src/components/projects/Table'
import Header from '../src/components/Header';

export default function Home() {

    return (
        <div className="container">
            <Header />
            <h1>Your Cool Projects</h1>
            <hr/>
            <ProjectsTable/> 
        </div>
    )
}
