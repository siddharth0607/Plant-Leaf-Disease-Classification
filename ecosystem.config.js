module.exports = {
  apps: [{
    name: 'plant-disease-api',
    script: 'api/main.py',
    interpreter: '/home/ubuntu/Plant-Leaf-Disease-Classification/venv/bin/python',
    cwd: '/home/ubuntu/Plant-Leaf-Disease-Classification',
    env: {
      NODE_ENV: 'production'
    },
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    max_memory_restart: '1G',
    error_file: '/home/ubuntu/.pm2/logs/plant-disease-api-error.log',
    out_file: '/home/ubuntu/.pm2/logs/plant-disease-api-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss'
  }]
}
