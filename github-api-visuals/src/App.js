import React from 'react';
import { Form } from 'semantic-ui-react';
import { Chart } from 'chart.js';
import './App.css';





function App() {
  var chart;
  var chartDisplayed = false;
  const [repoInput, setRepoInput] = React.useState('');
  const [orgInput, setOrgInput] = React.useState('');

  async function getStars()
  {
    const url = "https://api.github.com/search/repositories?q=stars:>75000"
    const response = await fetch(url);
    const data = await response.json();
    let stars = [];
    let names = [];
    let owners = [];
    for(var i = 0; i <data.items.length; i++)
    {
      stars[i] = data.items[i].stargazers_count;
      names[i] = data.items[i].name;
      owners[i] = data.items[i].owner.login
    }
    //for loop which combines the organisation name with the repo name.
    for(i = 0; i <owners.length; i++)
    {
      owners[i] = owners[i]+'/'+names[i];
    }
    chartDisplayed = true;
    var pointBackgroundColors = [];
    var ctx = document.getElementById("Chart");
    chart = new Chart(ctx, { type: 'bar', data: { labels: [...owners], datasets: [{label: 'Stars', data:[...stars],backgroundColor: pointBackgroundColors , borderColor: 'black', borderWidth: 1}]},
    options: {
      responsive: false,
      scales: {
        xAxes: [{
          ticks: {
            fontColor: 'black',
            maxRotation: 90,
            minRotation: 80
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: 'black',
            beginAtZero: true
          }
        }]
      },
      title: {
        fontColor: '#6666ff',
        fontSize: 36,
        display: true,
        text: 'Repositories with most stars. (Greater than 75,000 stars.)'
      },
      legend: {
      labels: {
        fontColor: 'black'
      },
    }
      
    }
    
  });
  for(i = 0; i< names.length; i++)
  {
    var r = Math.floor(Math.random() * 200);
    var g = Math.floor(Math.random() * 200);
    var b = Math.floor(Math.random() * 200);
    pointBackgroundColors.push('rgb('+r+','+ g+','+ b+')');
    chart.update();
  }
  }

  function getRepoData(e)
  {
    setRepoInput(e.target.value);
    //console.log(repoInput);
  }

  function getOrgData(e)
  {
    setOrgInput(e.target.value);
    //console.log(repoInput);
  }

  async function getRepos()
  {
    const url = "https://api.github.com/repos/"+orgInput+"/"+repoInput+"/contributors";
    const response = await fetch(url);
    const data = await response.json();
    if(data.message === "Not Found")
    {
      alert("Not a Valid Repo, try again.")
    }
    else{ 
    chartDisplayed = true;
    //console.log(data);
    let names = [];
    let contribute = [];
    for(var i = 0; i < data.length; i++)
    {
      names[i] = data[i].login;
      contribute[i] = data[i].contributions
    }
    var pointBackgroundColors = [];
    var ctx = document.getElementById("Chart");
    chart = new Chart(ctx, {type: 'doughnut', 
        data: {
            labels: [...names],
            datasets: [{
              label: 'Contributors.',
              data: [...contribute],
              backgroundColor: pointBackgroundColors,
            }
          ]
        },
        options: {
        title: {
          fontSize: 30,
          fontColor: '#6666ff',
          display: true,
          text: 'Doughnut chart which lists all contributors of the searched repo and how much of a contribution they have made.'
        }
      }

      });

      for(i = 0; i< names.length; i++)
      {
        var r = Math.floor(Math.random() * 200);
        var g = Math.floor(Math.random() * 200);
        var b = Math.floor(Math.random() * 200);
        pointBackgroundColors.push('rgb('+r+','+ g+','+ b+')');
        chart.update();
      }
    }
  }

  async function getLanguagesRepo()
  {
    const url =  "https://api.github.com/repos/"+orgInput+"/"+repoInput+"/languages";
    const response = await fetch(url);
    const data = await response.json();
    if(data.message === "Not Found")
    {
      alert("Not a Valid Repo, try again.")
    }
    else {
      chartDisplayed = true;
      let languageName = [];
      let bytesUsed = [];
      var pointBackgroundColors = [];
      for(var i = 0; i < Object.keys(data).length; i++)
      {
        languageName[i] = Object.keys(data)[i];
        bytesUsed[i] = Object.values(data)[i];
      }
      var ctx = document.getElementById("Chart").getContext('2d');
      chart = new Chart(ctx, {type: 'pie',
          data:{
            labels: [...languageName],
            datasets: [{
              label: 'Languages Used.',
              data: [...bytesUsed],
              backgroundColor: pointBackgroundColors,
            }]
          },
          options:{
          title: {
            fontColor: '#6666ff',
            fontSize: 36,
            display: true,
            text: 'Piechart showing what programming languages are used in the repo.'
          }
        }
        });
        for(i = 0; i< languageName.length; i++)
        {
        var r = Math.floor(Math.random() * 200);
        var g = Math.floor(Math.random() * 200);
        var b = Math.floor(Math.random() * 200);
        pointBackgroundColors.push('rgb('+r+','+ g+','+ b+')');
        chart.update();
       }
    }
  }



    //Verify(repoInput, data);
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
    if(chartDisplayed === true)
    {
      chart.destroy();
      chartDisplayed = false;
    }
    else{
      chartDisplayed = false;
    }
  }



  return (
      
      <div style={{backgroundColor: 'powderblue'}}>

        <div className= 'navbar'>Github API Visualisations</div>
        <div className= 'search'>
          <Form>
            <Form.Group>
              <Form.Input placeholder= 'Organisation...' name='name' onChange={getOrgData}/>
              <div className= 'slash'>/</div>
              <Form.Input placeholder= 'Repository...' name='name' onChange={getRepoData}/>
              <Form onSubmit={getRepos}>
              <Form.Button content= 'Search for Contributions' color = 'teal' />
              </Form>
              <Form onSubmit={getLanguagesRepo}>
              <Form.Button content= 'Search what languages are used.' color= 'teal' />
              </Form>
              <Form onSubmit={getStars} >
                <Form.Button content= 'Top Stars' color= 'teal'   />
              </Form>
              <Form onSubmit={clear}>
                <Form.Button content= 'Clear Page' color= 'red'/>
              </Form>
            </Form.Group>
          </Form>

        </div>
        <div className = 'chart'>
        <canvas id="Chart" width="1400" height="700"></canvas>
        </div>
        <script>
        </script>
      </div>
  );
}

export default App;
