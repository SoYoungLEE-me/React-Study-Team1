import React from 'react'
import { useUserStore } from '../../../../stores/useUserStore'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({component: Component}) => {
  const {authenticate} = useUserStore();

  if(!authenticate) {
    return <Navigate to={'/login'}></Navigate>
  }

  return (
    <Component></Component>
  )
}

export default PrivateRoute
