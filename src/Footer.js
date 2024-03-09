import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='Footer' >
        <p> Techy Toper  &copy; All rights reserved. {currentYear}</p>
    </footer>
  )
}

export default Footer