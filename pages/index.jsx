import React from 'react'
import ProjectsCard from '../src/components/projects/Card'
import Header from '../src/components/Header';

export default function Home() {

    return (
        <div className="container">
            <Header />
            <h1>Your Cool Projects</h1>
            <hr/>
            <ProjectsCard/> 
        </div>
    )
}
