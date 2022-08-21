import React from 'react'
import Clients from '../components/ClientComponents/Clients';
import { AddClientModal } from '../components/ClientComponents/AddClientModal';
import { AddProjectModal } from '../components/ProjectComponents/AddProjectModal';
import Projects from '../components/ProjectComponents/Projects';
import Header from "../components/Header";
export default function Home() {
  return (
    <div className="container">
      <Header />
      <h1>Your Cool Projects</h1>
      <hr/>
      {/* <div className="d-flex gap-3 mb-4">
          <AddClientModal/>
          <AddProjectModal/>
      </div> */}
      <Projects/>
    </div>
  )
}
