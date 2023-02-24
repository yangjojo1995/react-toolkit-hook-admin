const CracoAntDesignPlugin = require('craco-antd');
const path = require('path')

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#1890ff',
        },
      },
    },
  ],
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src') //@指向src路径
    }
  }
};