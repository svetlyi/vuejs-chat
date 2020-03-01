<template>
    <div>
        <nav class="uk-navbar uk-navbar-container uk-margin">
            <div class="uk-navbar-left">
                <ul class="uk-navbar-nav">
                    <li>
                        <router-link :to="{name: 'chat'}">
                            <span uk-icon="chevron-left"></span> <span class="uk-margin-small-left">Back to chat</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="uk-container uk-flex uk-flex-center">
            <h3 class="uk-heading-divider">Statistics</h3>
            <div>
                <div ref="chart"></div>
            </div>
        </div>
    </div>
</template>

<script>
  import userRepo from '../repository/user'
  import notification from "../../notification";
  import Highcharts from 'highcharts'
  import addMore from "highcharts/highcharts-more";
  addMore(Highcharts)

  export default {
    name: 'userStats',
    data() {
      return {
        stats: {}
      }
    },
    created() {
      userRepo.getStats().then((stats) => {
        console.log(stats);
        let statsToShow = []
        for (let prop in stats) {
          if ('null' === prop) {
            statsToShow.push({name: 'Not specified', y: stats[prop]})
          } else {
            statsToShow.push({name: prop, y: stats[prop]})
          }
        }
        Highcharts.chart(this.$refs['chart'], {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Users ages'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
            point: {
              valueSuffix: '%'
            }
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [{
            name: 'Brands',
            colorByPoint: true,
            data: statsToShow
          }]
        });
      }).catch((err) => {
        notification.send(err, 'danger')
      })
    }
  }
</script>