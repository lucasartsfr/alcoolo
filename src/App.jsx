import { useEffect, useState } from 'react'
import './App.css'
import { createClient } from "@supabase/supabase-js";
import useStore from './store/useStore.jsx';
import Screen from './components/Screen.jsx';
import { Menu } from './components/Menu.jsx';
import Settings from './components/Settings.jsx';

const supabase = createClient("https://llusyzjtnkpggaqvemuc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdXN5emp0bmtwZ2dhcXZlbXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NjIwNzIsImV4cCI6MjAyODEzODA3Mn0._WcadNvNVAhSNyQ9JI_UZ6XrVsUyQKolJvTDtZZpyxU");


function App() {

  const { updateListType, createListQuestions, setProbabilities,setColor, typeSettings, setTypeSettings } = useStore();

  async function initGame() {
    // Get Database
    const { data: questionsData } = await supabase.from('questions').select('*')
    const { data: gamesModeData } = await supabase.from('games_modes').select('*');
    const { data: modesData } = await supabase.from('modes').select('*');
    
    const questionList = {};
    // List Mode (Before, Time Attack ...)
    modesData.forEach(mode => {
        questionList[mode?.mode] = {};
    });

    // Add question to each mode
    questionsData.forEach(question => {
        const { mode, type } = question;
        questionList[mode][type] = [...(questionList[mode][type] || []), question];
        updateListType(Object.keys(questionList));
    });


    // Set Probabilities for each Type
    const proba = {}
    const color = {}
    gamesModeData.forEach(q => {
      proba[q?.mode] = typeof proba[q?.mode] === "object" ? proba[q?.mode] : {};
      proba[q?.mode][q?.type] = q?.probabilities;
      color[q?.mode] = typeof color[q?.mode] === "object" ? color[q?.mode] : {};
      color[q?.mode][q?.type] = q?.color;
    });

    const formattedData = gamesModeData.reduce((acc, curr) => {
      const { mode, type, ...rest } = curr;    
      if (!acc[mode]) {
        acc[mode] = {};
      }    
      acc[mode][type] = rest;    
      return acc;
    }, {});
    
    
    // Init Game
    createListQuestions(questionList)
    setProbabilities(proba)
    setColor(color)
    setTypeSettings(formattedData);

  }

  useEffect(() => {
    initGame();  
  }, []);



  return (
    <>
      <Menu/>
      <Screen />
      <Settings />
    </>
  )
}

export default App
