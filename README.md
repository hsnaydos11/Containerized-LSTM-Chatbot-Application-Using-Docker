# Chatbot Projesi / Chatbot Project

Bu proje, Docker kullanılarak konteynerize edilmiş bir chatbot uygulamasıdır. Hem ön yüz (frontend) hem de arka yüz (backend) bileşenlerini içerir.  
This project is a containerized chatbot application using Docker. It includes both frontend and backend components.

## Gereksinimler / Requirements

* Docker kurulu olmalıdır.  
* Docker must be installed.

## Kurulum ve Çalıştırma / Setup and Running

### 1.  **Ön Yüz (Frontend) Kurulumu / Frontend Setup:**

* Proje dizinine gidin ve `cd chatbot-frontend` komutu ile frontend klasörüne geçin.  
* Navigate to the project directory and change to the frontend folder with the `cd chatbot-frontend` command.

* Aşağıdaki komut ile Docker imajını oluşturun:  
  Create the Docker image with the following command:

    ```bash
    docker build -t chatbot_frontend:v1.0 
    ```

* Docker konteynerini başlatın:  
  Start the Docker container:

    ```bash
    docker run -d -p 3000:3000 chatbot_frontend:v1.0
    ```

* Uygulamaya tarayıcınızdan `http://localhost:3000/` adresini ziyaret ederek erişebilirsiniz.  
  Access the application by visiting `http://localhost:3000/` in your browser.

### 2.  **Önemli Önkoşul: LSTM Modelinin Eğitimi / Important Prerequisite: Training the LSTM Model**

* Docker konteynerizasyon sürecine geçmeden önce, chatbot'un temelini oluşturan LSTM (Uzun Kısa Süreli Bellek) modelinin eğitilmesi gerekmektedir. `chatbot-backend` dizini içerisinde bulunan `train.ipynb` Jupyter defteri, bu eğitim sürecini kolaylaştırmak amacıyla tasarlanmıştır. Kendi veri kümenizi kullanarak bu defter aracılığıyla özel bir model eğitebilirsiniz. Model eğitimi tamamlandıktan sonra, aşağıdaki adımlarla devam edebilirsiniz.  
  Before proceeding with the Docker containerization, the core LSTM (Long Short-Term Memory) model of the chatbot must be trained. The `train.ipynb` Jupyter notebook located in the `chatbot-backend` directory is designed to facilitate this training process. You can use your own dataset to train a custom model via this notebook. After the model training is complete, you can proceed with the following steps.

### 3.  **Arka Yüz (Backend) Kurulumu / Backend Setup:**
      
* Proje dizinine geri dönün ve `cd chatbot-backend` komutu ile backend klasörüne geçin.  
  Return to the project root directory and change to the backend folder with the `cd chatbot-backend` command.

* Aşağıdaki komut ile Docker imajını oluşturun:  
  Create the Docker image with the following command:

    ```bash
    docker build -t chatbot_backend:v1.0 
    ```

* Docker konteynerini başlatın:  
  Start the Docker container:

    ```bash
    docker run -d -p 5000:5000 chatbot_backend:v1.0
    ```

* Arka yüz (backend) artık `http://localhost:5000/` adresinde çalışıyor olacaktır.  
  The backend will now be running at `http://localhost:5000/`.

## Ek Bilgiler / Additional Information

* Bu adımları tamamladıktan sonra, chatbot uygulamanızın hem ön yüzü hem de arka yüzü Docker konteynerleri içinde çalışır durumda olacaktır.  
  After completing these steps, both the frontend and backend of your chatbot application will be running inside Docker containers.

* İmaj versiyonlarını (`v1.0`) ihtiyacınıza göre güncelleyebilirsiniz.  
  You can update the image versions (`v1.0`) as needed.

* Bağlantı noktalarını (`3000` ve `5000`) kendi tercihlerinize göre değiştirebilirsiniz.  
  You can modify the port numbers (`3000` and `5000`) to your preference.

* Proje aktif olarak geliştirilmeye devam edilmektedir. Görüntü işleme ve sesle etkileşim haline gelicek şekilde ayarlamalar yapılacaktır.  
  The project is under active development. Modifications will be made to incorporate image processing and voice interactions.

