import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  learnSidebar: [
    {
      type: 'category',
      label: 'Learn',
      link: { type: 'doc', id: 'incident-management/README' },
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Incident Management',
          link: { type: 'doc', id: 'incident-management/README' },
          items: [
            'incident-management/README',
            'incident-management/severity-levels',
            'incident-management/how-to-calculate-mttr-and-other-common-incident-recovery-metrics',
            'incident-management/on-call',
            'incident-management/sla-vs-slo-vs-sli',
            'incident-management/data-aggregation-and-aggregators'
          ],
        },
        {
          type: 'category',
          label: 'DevOps',
          link: { type: 'doc', id: 'devops/best-devops-tools/README' },
          items: [
            {
              type: 'category',
              label: 'Best DevOps Tools for Each Phase of the DevOps Lifecycle',
              link: { type: 'doc', id: 'devops/best-devops-tools/README' },
              items: [
                'devops/best-devops-tools/best-devops-planning-tools',
                'devops/best-devops-tools/best-devops-coding-tools',
                'devops/best-devops-tools/best-devops-build-tools',
                'devops/best-devops-tools/best-devops-testing-tools',
                'devops/best-devops-tools/best-devops-release-tools',
                'devops/best-devops-tools/best-devops-deployment-tools',
                'devops/best-devops-tools/best-devops-operations-tools',
                'devops/best-devops-tools/best-devops-monitoring-tools',
              ]
            },
            {
              type: 'category',
              label: 'What is DevOps?',
              link: { type: 'doc', id: 'devops/what-is-devops' },
              items: [
                'devops/what-is-devops/best-ci-cd-tools',
                'devops/what-is-devops/devops-infrastructure-and-automation',
                'devops/what-is-devops/what-is-a-devops-pipeline',
                'devops/what-is-devops/devops-vs.-agile',
                'devops/what-is-devops/top-25-devops-interview-questions',
                'devops/what-is-devops/what-are-the-benefits-of-devops',
                'devops/what-is-devops/what-is-ci-cd',
                'devops/what-is-devops/what-is-a-devops-engineer',
                'devops/what-is-devops/what-is-devsecops',
              ]
            },
            {
              type: 'category',
              label: 'What is Observability?',
              link: { type: 'doc', id: 'devops/what-is-observability/README' },
              items: [
                'devops/what-is-observability/use-and-red-method',
              ]
            },
            {
              type: 'category',
              label: 'What is Site Reliability Engineering (SRE)?',
              link: { type: 'doc', id: 'devops/what-is-site-reliability-engineering-sre/README' },
              items: [
                'devops/what-is-site-reliability-engineering-sre/four-golden-signals-sre-monitoring',
                'devops/what-is-site-reliability-engineering-sre/what-is-a-canary-deployment',
                'devops/what-is-site-reliability-engineering-sre/what-is-blue-green-deployment',
              ]
            }
          ]
        },
        {
          type: 'category',
          label: 'Docker',
          link: { type: 'doc', id: 'docker/overview' },
          items: [
            'docker/overview',
            'docker/dockerfile',
            'docker/images',
            'docker/storage',
            'docker/network',
            'docker/compose',
            'docker/swarm',
            'docker/resources',
          ]
        },
        {
          type: 'category',
          label: 'Prometheus',
          link: { type: 'doc', id: 'prometheus/overview' },
          items: [
            'prometheus/overview',
            'prometheus/data-model',
            'prometheus/metric-types',
            {
              type: 'category',
              label: 'PromeQL',
              link: { type: 'doc', id: 'prometheus/promql/README' },
              items: [
                'prometheus/promql/series-selection',
                'prometheus/promql/counter-rates-and-increases',
              ]
            },
            'prometheus/pushgateway',
            'prometheus/alertmanager',
            'prometheus/remote-storage',
          ]
        }
      ]
    },
    
  ],
};

export default sidebars;