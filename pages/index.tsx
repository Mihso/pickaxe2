'use client'

import Image from 'next/image'
import React, { useRef } from 'react'

interface Conversation {
  role: string
  content: string
}

export default function Home() {

  const [value, setValue] = React.useState<string>("")
  const [hide, setHide] = React.useState<string>("hidden")
  const [prompter, setPrompter] = React.useState<string>("")
  const [conversation, setConversation] = React.useState<Conversation[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },
    []
  )
  const handleInput2 = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPrompter(e.target.value)
    },[]
  )


  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const chatHistory = [...conversation, { role: "user", content: 'Based on the word "' + value + '", give me a prompt for you that clarifies in at least 3 sentences: Role, Style, and Goal.' }]

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
  }

  const handleKeyDown2 = async () => {
      const chatHistory = [...conversation, { role: "user", content: 'Behave in a manner based on this prompt: "' + value + '".'} ]
 
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

  const handleRefresh = () => {
    inputRef.current?.focus()
    console.log("pressed")
    setValue("")
    setConversation([])
  }

  return (

    <main className="flex h-screen min-w-900 flex-col content-start">

      {/* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>
      </div> */}

      <nav style= {{fontSize:"20px"}}>
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
        <li style={{alignContent: "right"}}>UserName</li>
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

    <input style={{ border: "black", borderStyle: "solid", minWidth:"550px", minHeight: "100px", font: "black"}}
            placeholder='In a phrase or two, describe what you want your bot to be good at.'
            className=' textarea w-full max-w-xs input input-bordered input-secondary'
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
          <button
            className='btn btn-primary btn-xs mt-6'
            onClick={handleRefresh}
          >
            Get your prompt
          </button>

    <div className={hide} style={{marginTop:"20px"}}>
    <p className="decoration-double" style={{fontSize: "20px"}}>Step 2</p>
      <p>Look over your prompt, polish it, and turn it into an app</p>
      <input style={{ border: "black", borderStyle: "solid", minWidth:"550px", minHeight: "100px", font: "black"}}
            className='textarea w-full max-w-xs input input-bordered input-secondary'
            value={prompter}
            onChange={handleInput2}
          />
          <button
            className='btn btn-primary btn-xs mt-6'
            onClick={handleKeyDown2}
          >
            Build your app
          </button>
          </div>



      </div>
      </div>

    </main>
  )
}
