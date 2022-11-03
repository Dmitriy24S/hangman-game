import React from 'react'

const HEAD = (
  <div
    key='head'
    style={{
      width: '25px',
      height: '25px',
      borderRadius: '50%',
      border: '10px solid black',
      position: 'absolute',
      top: '48px',
      right: '2px'
    }}
  />
)

const BODY = (
  <div
    key='body'
    style={{
      width: '10px',
      height: '70px',
      backgroundColor: 'black',
      position: 'absolute',
      top: '92px',
      right: '20px'
    }}
  />
)

const RIGHT_ARM = (
  <div
    key='right-arm'
    style={{
      width: '10px',
      height: '50px',
      backgroundColor: 'black',
      position: 'absolute',
      right: '20px',
      top: '77px',
      rotate: '45deg',
      transformOrigin: 'bottom left'
    }}
  />
)

const LEFT_ARM = (
  <div
    key='left-arm'
    style={{
      width: '10px',
      height: '50px',
      backgroundColor: 'black',
      position: 'absolute',
      top: '77px',
      right: '20px',
      rotate: '-45deg',
      transformOrigin: 'bottom right'
    }}
  />
)

const RIGHT_LEG = (
  <div
    key='right-leg'
    style={{
      width: '10px',
      height: '50px',
      backgroundColor: 'black',
      position: 'absolute',
      top: '106px',
      right: '11px',
      rotate: '145deg',
      transformOrigin: 'bottom left'
    }}
  />
)

const LEFT_LEG = (
  <div
    key='left-leg'
    style={{
      width: '50px',
      height: '10px',
      position: 'absolute',
      backgroundColor: 'black',
      top: '151px',
      right: '20px',
      rotate: '-60deg',
      transformOrigin: 'right bottom'
    }}
  />
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

interface Props {
  incorrectLettersAmount: number
}

const HangmanDrawing = ({ incorrectLettersAmount }: Props) => {
  console.log('body parts slice', BODY_PARTS.slice(0, incorrectLettersAmount))
  return (
    // container
    <div
      style={{
        position: 'relative',
        width: '238px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto'
      }}
      //  ! TODO: remove extra?
    >
      {/* person */}
      {BODY_PARTS.slice(0, incorrectLettersAmount)}

      {/* device */}
      {/* device - noose */}
      <div
        style={{
          width: '10px',
          height: '50px',
          backgroundColor: 'black',
          position: 'absolute',
          right: '20px',
          top: '0'
        }}
      />
      {/* device - top plank */}
      <div
        style={{
          width: '100px',
          height: '10px',
          backgroundColor: 'black',
          position: 'relative',
          left: '45px'
        }}
      />
      {/* device - side plank */}
      <div
        style={{
          backgroundColor: 'black',
          width: '10px',
          height: '250px'
        }}
      />
      {/* device - bottom plank */}
      <div style={{ backgroundColor: 'black', width: '250px', height: '10px' }} />
    </div>
  )
}

export default HangmanDrawing
