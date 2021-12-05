module.exports = {
  title: "Vidulum Chain",
  description: "Welcome to Vidulum Chain's documentation!",
  themeConfig: {
    navbar: true,
    logo: '/chain_doc_nav_logo.svg',
    nav: [
      {
        text: "Home",
        link: "/"
        },
        {
          text: "Getting Started",
          link: "/getting-started/"
        },

        {
          text: "Vidulum Chain",
          items: [
            {
              text: "Mainnet",
              link: "/getting-started/mainnet.md"
            },
            {
              text: "Testnet",
              link: "/getting-started/testnet.md"
            },
          ]
      },
      {
          text: "Resources",
          items: [
            {
              text: "Mainnet Explorer",
              link: "https://explorers.vidulum.app/vidulum"
            },
            {
              text: "Testnet Explorer",
              link: "https://explorers.vidulum.app/vidulumtestnet"
            },
            {
              text: "GitHub Repositories",
              link: "https://github.com/vidulum"
            },
            {
              text: "Vidulum Wallet (Android)",
              link: "https://play.google.com/store/apps/details?id=com.vidulumwallet.app"
            },
            {
              text: "Vidulum Wallet (iOS)",
              link: "https://apps.apple.com/us/app/id1505859171"
            }
          ]
      }
    ],
    sidebar: {
      "/getting-started/": [
        "",
        "mainnet",
        "testnet"
      ],
      "/resources/": [
        "chain-integration",
        "node-and-rpc-setup-notes",
        "blocks-and-transactions",
      ],
      "/api/" : "auto"
    },
    displayAllHeaders: true
  },
  base: "/docs/",
  plugins: [
    [
      "vuepress-plugin-export",
      {
        page: {
          format: 'A4',
          printBackground: true,
          margin: {
            top: 60,
            left: 20,
            right: 20,
            bottom: 60
          }
        },
        sorter: function (a, b) {
          var ordering = {
            Home: 0,
            "Getting Started": 1,
            "Testnet": 2,
            "Devnet": 3,
            "Send Your First Transaction": 4,
            Consensus: 5,
            Genesis: 7,
            "Transaction Accounting Model": 7,
            Transaction: 8,
            Serialization: 9,
            "Signature Schemes": 10,
            "Transaction Flow": 11,
            "Enclave Architecture": 12,
            "Transaction Privacy": 13,
            "node-joining": 14,
            Staking: 15,
            "reward-and-punishments": 16,
            "network-parameters": 17,
            "Notes on Performance": 18,
            "Notes on Production Deployment": 19,
            "Threat Model": 20,
            "technical_glossary": 21
            
          };
          return ordering[a["title"]] - ordering[b["title"]];
        }
      }
    ]
  ]
};
