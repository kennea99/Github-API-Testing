import React from 'react';
import {useState} from 'react';
import { Form } from 'semantic-ui-react';
import { Chart } from 'chart.js';

import './App.css';
import { Verify } from 'crypto';




function App() {
  var chart;
  var results;

  const [repoInput, setRepoInput] = React.useState('');
  //const [results, SetData] = React.useState('');

  async function getStars()
  {
    const url = "https://api.github.com/search/repositories?q=stars:>50000"
    const response = await fetch(url);
    const data = await response.json();
    let stars = [];
    let names = [];
    for(var i = 0; i <data.items.length; i++)
    {
      stars[i] = data.items[i].stargazers_count;
      names[i] = data.items[i].name;
    }

    var ctx = document.getElementById("Chart");
    chart = new Chart(ctx, { type: 'bar', data: { labels: [...names], datasets: [{label: 'Stars', data:[...stars], backgroundColor: 'rgba(255,99,132,.5)' , borderColor: 'rgba(255,99,132,1)', borderWidth: 1}]},
    options: {
      responsive: false,
      scales: {
        xAxes: [{
          ticks: {
            maxRotation: 90,
            minRotation: 80
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      title: {
        display: true,
        text: 'Repositories with most stars.'
      }
    }
  });
  }

  function getSearchData(e)
  {
    setRepoInput(e.target.value);
    //console.log(repoInput);
  }

  async function getRepos()
  {
    const url = "https://api.github.com/repos/"+repoInput+"/"+repoInput+"/contributors";
    const response = await fetch(url);
    const data = await response.json();
    if(data.message === "Not Found")
    {
      alert("not a repo")
    }
    else{
    console.log(data);
    //Verify(repoInput, data);
    }
  }
  
  /*function Verify(repoInput, data)
  {
    let matched = -1;
    if(data.total_count===0)
    {
      matched =-2;
    }
    //console.log(data.items.length);
    for(var i = 0; i<data.items.length; i++)
    {
      if(repoInput === data.items[i].name) {
        matched = i;
      }
    }
    if(matched === -1) {
      results = data.items[0];
    }
    else {
      results = data.items[matched];
      console.log(results);
    }
  }
  */
  



  function clear()
  {
    chart.destroy();
  }

  return (
      
      <div>
        <div className= 'navbar'>Github API Visualisations</div>
        <div className= 'search'>
          <Form>
            <Form.Group>
              <Form.Input placeholder= 'Repository' name='name' onChange={getSearchData}/>
              <Form onSubmit={getRepos}>
              <Form.Button content= 'Submit' />
              </Form>
              <Form onSubmit={getStars}>
                <Form.Button content= 'Top Stars'/>
              </Form>
              <Form onSubmit={clear}>
                <Form.Button content= 'Clear Page'/>
              </Form>
            </Form.Group>
          </Form>

        </div>
        <div className = 'chart'>
        <canvas id="Chart" width="1500" height="800"></canvas>
        </div>
        <script>
        </script>
      </div>
  );
}

export default App;
