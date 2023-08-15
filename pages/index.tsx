'use client'
import Image from 'next/image'
import React from 'react'

interface Conversation {
  role: string
  content: string
}

export default function Home() {

  const [value, setValue] = React.useState<string>("")
  const [hide, setHide] = React.useState<string>("hidden")
  const [prompter, setPrompter] = React.useState<string>("")
  const [conversation, setConversation] = React.useState<Conversation[]>([])

  const handleKeyDown = async () => {
      setHide("hidden")
      const chatHistory = [...conversation, { role: "user", content: 'Based on the keywords "' + value + '", give me a one paragraph prompt for you that at least answers role, style, and goal.' }]

      const response = await fetch("/api/OpenAI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chatHistory }),
      })

      const data = await response.json()
      setValue("")
      setConversation([
        ...chatHistory,
        { role: "assistant", content: data.result.choices[0].message.content },
      ])


      setPrompter((data.result.choices[0].message.content))


      setHide("")
  }

  const handleKeyDown2 = async () => {
      const chatHistory = [...conversation, { role: "user", content: 'Behave in a manner based on this prompt: "' + value + '".'} ]
      console.log(prompter)
      const response = await fetch("/api/OpenAI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chatHistory }),
      })

      const data = await response.json()
      setValue("")
      setConversation([
        ...chatHistory,
        { role: "assistant", content: data.result.choices[0].message.content },
      ])

      setPrompter((data.result.choices[0].message.content))
      
      setHide("")
  }

  function step2(){

    if(hide !=="hidden"){
      return (
        <div className={hide} style={{marginTop:"20px"}}>
        <p className="decoration-double" style={{fontSize: "20px"}}>Step 2</p>
          <p>Look over your prompt, polish it, and turn it into an app</p>
          <textarea style={{ border: "black", borderStyle: "solid", width: "100%", minHeight: "100px", font: "black"}}
                className='textarea w-full max-w-xs input input-bordered'
                defaultValue={prompter}
                onChange = {(e)=>setPrompter(e.target.value)}
              />
              <button
                onClick={handleKeyDown2}
              >
                Build your app
              </button>
              </div>
      )

    }
    else{
    return(
      <></>
    )
    }
  }

  return (

    <main className="flex h-screen min-w-900 flex-col content-start">

      <nav style= {{fontSize:"18px"}}>
        <li style={{fontSize:"30px"}}>
          <Image 
          style={{display:"inline"}} 
          src="/image 48.png" 
          alt="Pickaxe logo" 
          width={32} 
          height={32} 
          priority/>
          {" "} Pickaxe
          </li>
        <li>Make A Pickaxe</li>
        <li>Dashboard</li>
        <li>Enterprise</li>
        <li>Tools</li>
        <li className='absolute right-0'> <Image 
          style={{display:"inline"}} 
          src="/search.png" 
          alt="Search logo" 
          width={24} 
          height={24} 
          priority/>
          {" "}
          <Image 
          style={{display:"inline"}} 
          src="/user.png" 
          alt="user logo" 
          width={24} 
          height={24} 
          priority/>
          {" "}UserName{" "}<Image 
          style={{display:"inline"}} 
          src="/menu.png" 
          alt="Menu logo" 
          width={24} 
          height={24} 
          priority/></li>
      </nav>
      <div className="grid grid-flow-col w-full h-full justify-stretch min-w-900">
      <div className="flex flex-col min-w-450 justify-center content-center justify-items-center">
            <Image
              src="/chromewalnut_robot_fairy_composing_minimalist_figuration_single_682591b0-72bf-4eb4-be8d-83b3664393da.png"
              alt="robot fairy Logo"
              className=""
              style={{alignSelf:"center"}}
              width={318}
              height={318}
              priority
            />
            <div style={{textAlign:"center", fontSize:"24px"}}>
            <p >Create your own AI App</p>
              <p>with our Wizard</p>
            </div>

        </div>

      <div className="flex flex-col min-w-450 bg-white justify-center" style={{paddingLeft:"3%", font: "black"}}>
      <p className="decoration-double" style={{fontSize: "20px"}}>Step 1</p>
      <p>Turn your idea into an prompt</p>

    <textarea style={{ border: "black", borderStyle: "solid", width:"100%", minHeight: "100px", font: "black"}}
            placeholder='In a phrase or two, describe what you want your bot to be good at.'
            className=' textarea w-full max-w-xs input input-bordered input-secondary'
            value={value}
            onChange={(e)=>setValue(e.target.value)}
          />
          <button
            onClick={handleKeyDown}
          >
            Get your prompt
          </button>

      {step2()}

      </div>
      </div>

    </main>
  )
}
