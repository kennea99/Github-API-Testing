import React from 'react';
import { Form } from 'semantic-ui-react';
import { Chart } from 'chart.js';

import './App.css';




function App() {
  
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
    var myChart = new Chart(ctx, {type: 'bar', data: { labels: [...names], datasets: [{label: 'Stars', data:[...stars], backgroundColor: 'rgba(255,99,132,1)' , borderColor: 'rgba(255,99,132,1)', borderWidth: 1}]},
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
      }
    }
  });
  }

  return (
      
      <div>
        <div className= 'navbar'>Github API Visualisations</div>
        <div className= 'search'>
          <Form onSubmit={getStars}>
            <Form.Group>
              <Form.Input placeholder= 'Repository' name='name'/>
              <Form.Button content= 'Submit'/>
              <Form.Button content= 'Top Stars' data-content ="shows a graph of the repositories with the most stars."/>
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
