//fetching data from the template form
const form = document.getElementsByTagName('form')[0];
const population = document.getElementById('population');
const projectionTime = document.getElementById('projection-time');
const periodType = document.getElementById('period-type');
const reportedCases = document.getElementById('reported-cases');
const hospitalBeds = document.getElementById('hospitals-bed-available');
const finalOutput = document.getElementById("final-output");

form.addEventListener('submit', (event) => {
    event.preventDefault();

//Input data values
    const data = {
        region: {
            name: 'Africa',
            avgAge: 19.7,
            avgDailyIncomeInUSD: 4,
            avgDailyIncomePopulation: 0.73
        },
        periodType: periodType.value,
        projectionTime: projectionTime.value,
        reportedCases: reportedCases.value,
        population: population.value,
        hospitalBeds: hospitalBeds.value
    };

    periodType.value = '';
    projectionTime.value = '';
    reportedCases.value = '';
    population.value = '';
    hospitalBeds.value = '';

    //optaining the values from the estimator function
    const { impact, severeImpact, data: { projectionTime: time, periodType: period } } = covid19ImpactEstimator(data);

    finalOutput.innerHTML = `
    <h1 class="navbar navbar-dark">Estimate</h1>
            <section class="card bg-light mx-5 my-3">
                <div class="card-body">
                    <h3 class="card-title text-warning">Average Impact</h3>
                    <p class="card-text"><b>Number of people currently infected: </b> ${impact.currentlyInfected.toLocaleString()}</p>
                    <p class="card-text"><b>Number of people infected in <i>${time.toLocaleString()} ${period}</i> time: </b> ${impact.infectionsByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><b>Number of severe cases in <i>${time.toLocaleString()} ${period}</i> time: </b> ${impact.severeCasesByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><b>Number of available hospital beds in <i>${time.toLocaleString()} ${period}</i> time: </b> ${impact.hospitalBedsByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><b>Number of ICU cases in <i>${time.toLocaleString()} ${period}</i> time: </b> ${impact.casesForICUByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><b>Number of patients in need of ventilators in <i>${time.toLocaleString()} ${period}</i> time: </b> ${impact.casesForVentilatorsByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><b>Amount of money lost by the economy daily in <i>${time.toLocaleString()} ${period}</i>time: </b> ${impact.dollarsInFlight.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                </div>
            </section>
            <section class="card bg-light mx-5 my-3">
                <div class="card-body">
                    <h3 class="card-title text-danger">Severe Impact</h3>
                    <p class="card-text"><b>Number of people currently infected: </b>  ${severeImpact.currentlyInfected.toLocaleString()}</p>
                    <p class="card-text"><b>Number of people infected in <i>${time.toLocaleString()} ${period} </i> time: </b> ${severeImpact.infectionsByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><b>Number of severe cases in <i>${time.toLocaleString()} ${period} </i> time: </b> ${severeImpact.severeCasesByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><b>Number of available hospital beds in <i>${time.toLocaleString()} ${period}</i> time: </b> ${severeImpact.hospitalBedsByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><b>Number of ICU cases in <i>${time.toLocaleString()} ${period}</i> time: </b> ${severeImpact.casesForICUByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><b>Number of patients in need of ventilators in <i>${time.toLocaleString()} ${period}</i> time :</b> ${severeImpact.casesForVentilatorsByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><b>Amount of money lost by the economy daily in <i>${time.toLocaleString()} ${period}</i> time: </b> ${severeImpact.dollarsInFlight.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                </div>
            </section>
    `;

    finalOutput.scrollIntoView();
});