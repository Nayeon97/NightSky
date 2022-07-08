from flask import Flask, request
from flask_cors import CORS

import torch
import numpy as np
from kobert_tokenizer import KoBERTTokenizer
from transformers import BertForSequenceClassification


app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
model = BertForSequenceClassification.from_pretrained('./model', local_files_only=True)
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
model.to(device)

def prediction(predict_sentence):
  if type(predict_sentence) == str:
      data = [predict_sentence]
  else:
      data = predict_sentence

  inputs = tokenizer(data, return_tensors='pt')
  inputs.to(device)

  with torch.no_grad():
        logits = model(**inputs).logits

  predicted_class_id = logits.argmax().item()
  output = model.config.id2label[predicted_class_id]
    
  if output == "LABEL_0":
    return "놀람"
  elif output == "LABEL_1":
    return "분노"
  elif output == "LABEL_2":
    return "불안"
  elif output == "LABEL_3":
    return "슬픔"
  elif output == "LABEL_4":
    return "평범"
  elif output == "LABEL_5":
    return "행복"
  elif output == "LABEL_6":
    return "혐오"



@app.route('/')
def main_page():
    return "hello world!"


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        diary = request.get_json()
        return prediction(diary['diary'])

if __name__ == '__main__':
    app.run(host="0.0.0.0")