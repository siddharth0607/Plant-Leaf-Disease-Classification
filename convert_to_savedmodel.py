import tensorflow as tf

num_models = 3
for i in range(num_models):
    model = tf.keras.models.load_model(f'E:/Plant-Leaf-Disease-Prediction/models_h5/model_v{i+1}.h5')
    model.save(f'E:/Plant-Leaf-Disease-Prediction/saved_models/{i+1}', save_format='tf')