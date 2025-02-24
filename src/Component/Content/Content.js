import React, { Suspense } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'
import { router } from '../../router'

function Content() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex justify-center h-screen bg-[#1a2c38]">
            {/* You can add a Loader component here if needed */}
          </div>
        }
      >
      <Routes>
        {router?.map((root, index) => (
            <Route 
            key={index}
            path={root.path}
            element={<root.element/>}/>
        ))}
        <Route path='/' element={<Navigate to="/Home" replace/>}/>
      </Routes>
      </Suspense>
    </div>
  )
}

export default Content
