#**Traffic Sign Recognition** 

##Writeup Template

###You can use this file as a template for your writeup if you want to submit it as a markdown file, but feel free to use some other method and submit a pdf if you prefer.

---

**Build a Traffic Sign Recognition Project**

The goals / steps of this project are the following:
* Load the data set (see below for links to the project data set)
* Explore, summarize and visualize the data set
* Design, train and test a model architecture
* Use the model to make predictions on new images
* Analyze the softmax probabilities of the new images
* Summarize the results with a written report


[//]: # (Image References)

[image1]: ./examples/grayscale_color.png "Grayscaling color"
[image2]: ./examples/grayscale_gray.png "Grayscaling gray"
[image3]: ./examples/traffic_sign_1.png "Traffic Sign 1"
[image4]: ./examples/traffic_sign_2.png "Traffic Sign 2"
[image5]: ./examples/traffic_sign_3.png "Traffic Sign 3"
[image6]: ./examples/traffic_sign_4.png "Traffic Sign 4"
[image7]: ./examples/traffic_sign_5.png "Traffic Sign 5"

## Rubric Points
###Here I will consider the [rubric points](https://review.udacity.com/#!/rubrics/481/view) individually and describe how I addressed each point in my implementation.  

---
###Writeup / README

####1. Provide a Writeup / README that includes all the rubric points and how you addressed each one. You can submit your writeup as markdown or pdf. You can use this template as a guide for writing the report. The submission includes the project code.

You're reading it! and the project code is in Traffic_Sign_Classifier.html

###Data Set Summary & Exploration

####1. Provide a basic summary of the data set and identify where in your code the summary was done. In the code, the analysis should be done using python, numpy and/or pandas methods rather than hardcoding results manually.

The code for this step is contained in the second code cell of the IPython notebook.  

I used the pandas library to calculate summary statistics of the traffic
signs data set:

* The size of training set is 34799
* The size of test set is 12630
* The shape of a traffic sign image is (32, 32, 3)
* The number of unique classes/labels in the data set is 43

####2. Include an exploratory visualization of the dataset and identify where the code is in your code file.

The code for this step is contained in the third code cell of the IPython notebook.  

The code is from the LeNet lab, which randomly picks a index and shows the image using Matplotlib.

###Design and Test a Model Architecture

####1. Describe how, and identify where in your code, you preprocessed the image data. What tecniques were chosen and why did you choose these techniques? Consider including images showing the output of each preprocessing technique. Pre-processing refers to techniques such as converting to grayscale, normalization, etc.

The code for this step is contained in the fourth code cell of the IPython notebook.

I converted the images to grayscale because traffic signs are recognized by the shape or text not the colors. I used the formula 0.299 * r + 0.587 * g + 0.114 * b, which produces grayscale images based on human perception.

Here is an example of a traffic sign image before and after grayscaling.

![alt text][image1]
![alt text][image2]

####2. Describe how, and identify where in your code, you set up training, validation and testing data. How much data was in each set? Explain what techniques were used to split the data into these sets. (OPTIONAL: As described in the "Stand Out Suggestions" part of the rubric, if you generated additional data for training, describe why you decided to generate additional data, how you generated the data, identify where in your code, and provide example images of the additional data)

The training, validation, and testing data are provided in this project. There are 34799 images in the training set, 12630 images in the testing set, and 4410 images in the validation set. The validation data are about one eighth of the size of the training data set.

The code for loading the data and distinguishing features and labels is contained in the first code cell of the IPython notebook.

####3. Describe, and identify where in your code, what your final model architecture looks like including model type, layers, layer sizes, connectivity, etc.) Consider including a diagram and/or table describing the final model.

The code for my final model is located in the fifth cell of the IPython notebook. The model is extended from the LeNet-5 Lab.

My final model consisted of the following layers:

| Layer         		|     Description	        					| 
|:---------------------:|:---------------------------------------------:| 
| Input         		| 32x32x1 grayscale image   							| 
| Convolution 1x1     	| 1x1 stride, valid padding, outputs 32x32x6 	|
| RELU					|												|
| Convolution 3x3     	| 1x1 stride, valid padding, outputs 30x30x12 	|
| RELU					|												|
| Convolution 5x5     	| 1x1 stride, valid padding, outputs 26x26x24 	|
| RELU					|												|
| Max pooling	      	| 2x2 stride,  outputs 13x13x24 				|
| Convolution 5x5     	| 1x1 stride, valid padding, outputs 9x9x48 	|
| RELU					|												|
| Max pooling	      	| 2x2 stride,  outputs 4x4x48 				|
| Fully connected		| Inputs 768, outputs 200        									|
| RELU					|												|
| Fully connected		| Inputs 200, outputs 140        									|
| RELU					|												|
| Fully connected		| Inputs 140, outputs 43        									|
 


####4. Describe how, and identify where in your code, you trained your model. The discussion can include the type of optimizer, the batch size, number of epochs and any hyperparameters such as learning rate.

The code for training the model is located in the sixth cell of the IPython notebook. 

To train the model, I computed the softmax cross entropy and used reduce mean to compute the loss. The optimizer here is the Adam Optimizer. The goal is to minimize the loss.

The batch size is 128. The number of epochs is 10. Learning rate is 0.001.

####5. Describe the approach taken for finding a solution. Include in the discussion the results on the training, validation and test sets and where in the code these were calculated. Your approach may have been an iterative process, in which case, outline the steps you took to get to the final solution and why you chose those steps. Perhaps your solution involved an already well known implementation or architecture. In this case, discuss why you think the architecture is suitable for the current problem.

The code for calculating the accuracy of the model is located in the sixth and seventh cell of the Ipython notebook.

My final model results were:
* training set accuracy of 0.989
* validation set accuracy of 0.947
* test set accuracy of 0.929

If an iterative approach was chosen:
* What was the first architecture that was tried and why was it chosen? I applied the LeNet-5 Lab on the dataset at the beginning, since it performs well on distinguishing grayscale images with 10 categories. I think it is a good idea to try it on a more complicated data set and see how performance changes.
* What were some problems with the initial architecture? The accuracy was about 0.88, which is good but not good enough. I tried to change the size of convolution, to tune the hyperparameter such as learning rate, but the accuracy was still around 0.88.
* How was the architecture adjusted and why was it adjusted? According to the accuracy on the training and validation set, the model was underfitting. Based on the LeNet-5 Lab, I added two convolutional layers at the beginning. The first layer uses a 1x1 window and produces the same width and height, but it extracted 6 in depth. Here I assume the model extracted more information from the images. The second layer I added was a convolutional layer with 3x3 window. Before using a 5x5 window in the LeNet-5 Lab, the model looks into the image with a smaller 3x3 window. Basically I added more convolutional layers in order to get more information for better performance.
* Which parameters were tuned? How were they adjusted and why? I tuned the learning rate from 0.001 to 0.0005 and 0.0001, but I found it took more time but the accuracy was not improve. Thus, I went back to 0.001, since it is enough.
* What are some of the important design choices and why were they chosen? There are four convolutional layers in my architecture. These layers might help learning information from the images. I did not use max pooling in the first two layers. The original information may be kept more detailed. The results show that it works well.


###Test a Model on New Images

####1. Choose five German traffic signs found on the web and provide them in the report. For each image, discuss what quality or qualities might be difficult to classify.

Here are five German traffic signs that I found on the web:

![alt text][image3] ![alt text][image4] ![alt text][image5] 
![alt text][image6] ![alt text][image7]

The first image might be easy to classify because there are more training images of speed limit. The second and third images might be easy to classify because STOP sign and NO ENTRY sign are not similar to any other signs. The fourth and fifth images might be difficult to classify because Double Curve sign is similar to some signs like Go Left/Right or Dangerous Curve and Road Work sign is more complicated.

####2. Discuss the model's predictions on these new traffic signs and compare the results to predicting on the test set. Identify where in your code predictions were made. At a minimum, discuss what the predictions were, the accuracy on these new predictions, and compare the accuracy to the accuracy on the test set (OPTIONAL: Discuss the results in more detail as described in the "Stand Out Suggestions" part of the rubric).

The code for making predictions on my final model is located in the 11th and 12th cells of the IPython notebook.

Here are the results of the prediction:

| Image			        |     Prediction	        					| 
|:---------------------:|:---------------------------------------------:| 
| Speed limit (30km/h)      		| Speed limit (30km/h)   									| 
| Stop     			| Speed limit (60km/h) 										|
| No entry					| No entry											|
| Double curve	      		| Right-of-way at the next intersection					 				|
| Road work			| Road work      							|


The model was able to correctly guess 3 of the 5 traffic signs, which gives an accuracy of 60%. This compares favorably to the accuracy on the test set of 92.9%. However, there are only 5 traffic signs, so the accuracy is not sufficient to make any conclusion.

####3. Describe how certain the model is when predicting on each of the five new images by looking at the softmax probabilities for each prediction and identify where in your code softmax probabilities were outputted. Provide the top 5 softmax probabilities for each image along with the sign type of each probability. (OPTIONAL: as described in the "Stand Out Suggestions" part of the rubric, visualizations can also be provided such as bar charts)

The code for making predictions on my final model is located in the 13th cell of the Ipython notebook.

For the first image, the model is relatively sure that this is a speed limit (30km/h) (probability of 0.2050), and the image does contain a speed limit (30km/h). The top five soft max probabilities were

| Probability         	|     Prediction	        					| 
|:---------------------:|:---------------------------------------------:| 
| .2050         			| Speed limit (30km/h)   									| 
| .1104     				| Speed limit (60km/h) 										|
| .0879					| End of speed limit (80km/h)											|
| .0844	      			| Speed limit (80km/h)					 				|
| .0685				    | Stop      							|


For the second image, the model is relatively sure that this is a Speed limit (60km/h) (probability of 0.1753), but the image does not contain a Speed limit (60km/h). The top five soft max probabilities were

| Probability         	|     Prediction	        					| 
|:---------------------:|:---------------------------------------------:| 
| .1753         			| Speed limit (60km/h)   									| 
| .0867     				| Speed limit (50km/h) 										|
| .0573					| Stop											|
| .0501	      			| Speed limit (80km/h)					 				|
| .0471				    | Speed limit (30km/h)      							|


For the third image, the model is relatively sure that this is a no entry sign (probability of 0.6332), and the image does contain a no entry sign. The top five soft max probabilities were

| Probability         	|     Prediction	        					| 
|:---------------------:|:---------------------------------------------:| 
| .6332         			| No entry   									| 
| .2897     				| Priority road 										|
| .1918					| End of speed limit (20km/h)											|
| .0746	      			| Turn right ahead					 				|
| .0598				    | End of all speed and passing limits      							|


For the fourth image, the model is relatively sure that this is a right-of-way at the next intersection (probability of 0.3783), but the image does not contain a right-of-way at the next intersection. The top five soft max probabilities were

| Probability         	|     Prediction	        					| 
|:---------------------:|:---------------------------------------------:| 
| .3783         			| Right-of-way at the next intersection   									| 
| .2127     				| General caution 										|
| .1061					| Children crossing											|
| .0739	      			| 	Pedestrians					 				|
| .0004				    | Go straight or left      							|



For the third image, the model is relatively sure that this is a road work sign (probability of 0.8589), and the image does contain a road work sign. The top five soft max probabilities were

| Probability         	|     Prediction	        					| 
|:---------------------:|:---------------------------------------------:| 
| .8589         			| Road work   									| 
| .6279     				| Speed limit (80km/h) 										|
| .4594					| Children crossing											|
| .4388	      			| Speed limit (30km/h)					 				|
| .4388				    | Turn right ahead      							|



