#include <stdio.h>
#include <stdlib.h>
#include <time.h>

/************************************************************
*				The Definition of Constant			   		*	
************************************************************/

#define POPSIZE 500  	// population size
#define MAXIMIZATION 1 	// maximization flag
#define MINIMIZATION 2 	// minimization flag

/************************************************************
*				The Definition of User Data			   		*
*(For different problem,there are some difference. )   		*	
************************************************************/

#define Cmax 100	  // certain maximal value
#define Cmin 0        // certain minimum value
#define LENGTH1 10	  // the chromosome length of 1st variable
#define LENGTH2 10	  // the chromosome length of 1st variable
#define CHROMLENGTH LENGTH1+LENGTH2  // the chromosome(???) length of 1st variable

int FunctionMode=MAXIMIZATION;		//optimization type
int PopSize=80;						//population size
int MaxGeneration=200; 				//max number of gereration
double Pc=0.6;						//probablity of crossover (??)
double Pm=0.001;						//probability of mutaion (??)

/************************************************************
*				The Definition of Data structure	   		*	
************************************************************/
struct individual
{
	char chrom[CHROMLENGTH+1];	// a string of code representing individual
	double value;						//object value of this individual
	double fitness;						//fitness value of this individual
};


/************************************************************
*				The Definition of Global variables	   		*	
************************************************************/
int generation;							//number of generation
int best_index;							//index of best individual
int worst_index;						//index of worst individual
struct individual bestindividual;		//best individual of current generation
struct individual worstindividual;		//worst individual of current generation
struct individual currentbest;			//best individual by now
struct individual population[POPSIZE];	//population

/************************************************************
*				Declaration of Prototype	   				*	
************************************************************/
void GenerateInitialPopulation();
void GenerateNextPopulation();
void EvaluatePopulation();
long DecodeChromosome (char * , int,int);
//long DecodeChromosome (char * string , int point,int length);
void CalculateObjectValue();
void CalculateFitnessValue();
void FindBestAndWorstIndividual();
void PerformEvolution();
void SelectionOperator();
void CrossoverOperator();
void MutationOperator();
void OutputTextReport();

/************************************************************
*				main function				   				*	
************************************************************/
int main()
{
	generation=0;
	GenerateInitialPopulation();
	EvaluatePopulation();
	while (generation<MaxGeneration)
	{
		generation++ ;
		GenerateNextPopulation();
		EvaluatePopulation();
		PerformEvolution();
		OutputTextReport();
		printf("\n--------------------");
	}

}

/************************************************************
*		Function: Generate the first population.			*
*					Variable: None.   						*	
************************************************************/
void GenerateInitialPopulation()
{
	int i,j;

	srand( time(NULL) );
	for(i=0; i<PopSize;i++)
	{
		for (j=0; j<CHROMLENGTH; j++)
		{
			population[i].chrom[j] = (rand()%10)<5?'0':'1'; 
		}
		population[i].chrom[CHROMLENGTH]='\0';
	}
}

/************************************************************
*		Function: Initialize the first generation.			*
*					Variable: None.   						*	
************************************************************/
void GenerateNextPopulation()
{
 	SelectionOperator();
 	CrossoverOperator();
 	MutationOperator();	
}

/************************************************************
*Function:Evaluate population according to certain formula.	*
*					Variable: None.   						*	
************************************************************/
void EvaluatePopulation()
{
	CalculateObjectValue();
	CalculateFitnessValue();
	FindBestAndWorstIndividual();	
}

/************************************************************
*	Function:To decode a binary chromosome into				*
*	a decimal integer.										*
*	Variable:None.											*
*	Note:The returned value may be plus£¬or minus.			*
*	For different coding method£¬this value may				* 
*	be changed into "unsigned int".							*
************************************************************/
long DecodeChromosome (char * string , int point,int length)
{
	int i;
	long decimal=0L;
	char *pointer;
	for(i=0,pointer=string+point;i<length;i++,pointer++)
	{
		decimal+=(*pointer-'0')<<(length-1-i);
	}
	return(decimal);
}

/************************************************************
*	Function: To calculate object value.Variable:None.		*
*	Variable:None.											*
*	Note: For different problem,user must change these code.*
*	This example is dealing with Rosenbrock function.		*
*	Rosenbrock function is defined as:						*
*	f(x1, x2)=100*(x1**2-x2)**2+(1-x1)**2					*
*	Its maximal value is:									*
*	f(-2.048£¬-2.048£©=3905.926227							*
************************************************************/
void CalculateObjectValue()
{
	int i;
	long temp1,temp2;
	double x1,x2;
	
	//Rosenbrock function
	for(i=0;i<PopSize;i++)
	{
		temp1=DecodeChromosome(population[i].chrom,0,LENGTH1);
		temp2=DecodeChromosome(population[i].chrom,LENGTH1,LENGTH2);
		x1=4.096 * temp1/ 1023.0 -2.048;
		x2=4.096 * temp2/1023.0-2.048;
		population[i].value = 100*(x1*x1-x2)*(x1*x1-x2)+(1-x1)*(1-x1);
	
	}

}

/************************************************************
*		Function: to Calculate fitness value.				*
*					Variable: None.   						*	
************************************************************/
void CalculateFitnessValue()
{
 	int i;
	double temp;
	for (i=0; i<PopSize; i++)
	{
		if (FunctionMode==MAXIMIZATION)	// maximization
		{
			if (( population [i]. value + Cmin) >0.0)
				temp = Cmin + population [i] .value;	
			else
				temp =0.0;
		}
		else 
		if (FunctionMode== MINIMIZATION)	//ducbminimization
		{
			if ( population [i] .value<Cmax)
				temp = Cmax - population [i] .value;
			else 
				temp=0.0; 
		}
		population[i].fitness=temp; 
	}
}

/************************************************************
*		Function: To Find out the best individual so		*
*		far current generation.								*
*		Variable: None 						*
************************************************************/
void FindBestAndWorstIndividual()
{
	int i;
	double sum=0.0;
	//find out the best and worst individual of this generation
	bestindividual = population[0];
	worstindividual = population[0];
	for(i=1; i<PopSize;i++)
	{
		if(population[i]. fitness>bestindividual. fitness)
		{
			bestindividual = population [i];
			best_index =i;
		}
		else 
		if (population[i].fitness<worstindividual.fitness)
		{
			worstindividual = population [i];
			worst_index =i;		
		}
		sum+=population [i] .fitness;
		}
	//find out the best individual so far
	if(generation==0)
	{
		currentbest=bestindividual;
	}
	else
	{
		if(bestindividual.fitness>currentbest.fitness)
			currentbest=bestindividual;
	}
}

/************************************************************
*	Function:To perform evolution operation based on elitise*
*	model.Elitist model is to replace the worst individual	* 
*	of this generation by the currentbest one.				*
*	Variable:None.											*
************************************************************/	
void PerformEvolution()
{
	if ( bestindividual. fitness> currentbest. fitness)
		currentbest= population [ best_index];
	else  
		population [ worst_index]= currentbest;
}

/************************************************************
*	Function:To reproduce a chromosome by					*
*	proportional selection.									*
*	Variable: None.											*
************************************************************/	
void SelectionOperator()
{
	int i,index;
	double p,sum=0.0;
	double cfitness[POPSIZE];	//cumulative fitness value
	struct individual newpopulation[POPSIZE];	

	// calculate relative fitness
	for (i=0; i<PopSize; i++)
		sum+= population [i] .fitness;
	for (i=0; i<PopSize; i++)
		cfitness [i] = population [i] .fitness/sum;

	// calculate cumulative fitness
	for (i=1; i<PopSize; i++)
		cfitness [i] =cfitness [i-1]+cfitness [i];

	// selection operation
	for (i=0; i<PopSize; i++)
	{
		p=rand () %1000/1000.0;	
		index =0;
		while (p>cfitness [index] )
			index++;
		newpopulation [i] = population [index];
	}
	for (i=0; i<PopSize; i++)
		population [i] =newpopulation [i];
}

/************************************************************
*	Function:Crossover two chromosome by means of 			*
*	one-point crossover¡£									*
*	Variable: None.											*
************************************************************/
void CrossoverOperator()
{
	int i,j;
	int index [POPSIZE];
	int point,temp;
	double p;
	char ch;
	//srand( time(NULL) );
	// make a pair of individual randomly
	for (i=0; i<PopSize;i++)
		index [i] = i;
	for (i=0; i<PopSize; i++) 
	{
		point = rand()%(PopSize-i);  
		temp= index [i];
		index [i] = index [ point+i];
		index [point+i] = temp;
	} 

	// oneÒ»point crossover operation
	for (i=0; i< PopSize-1; i+=2)
	{
		p= rand ()% 1000/1000.0;
		if (p<Pc)
		{
			point = rand()%(CHROMLENGTH-1) + 1; 
			for (j= point; j< CHROMLENGTH; j++ ) 
			{
				ch= population [index [i]] .chrom [j];
				population [index [i]] . chrom [j]= population [index [i+ 1]] .chrom [j];
				population [index [i+ 1]] .chrom [j] = ch;
			}
		} 
	} 
}

/************************************************************
*	Function:Mutation of a  chromosome.			 			*
*	Variable: None.											*
************************************************************/
void MutationOperator(void)
{
	int i, j;
	double  p;
	// bit mutation
	for ( i=0; i< PopSize; i++ )
	{
		for (j=0; j< CHROMLENGTH; j++ )
		{
			p = rand () % 1000/ 1000.0;
			if (p< Pm) 
			{
				population[i].chrom[j]=(population [i]. chrom[j]=='0')?'1':'0';
			}
		}
	}
}

/************************************************************
*	Function: Output the results of current population.		*		 			*
*	Variable: None.											*
************************************************************/
void OutputTextReport()
{
	int i;
	double sum;	// temporary sum
	double average;	// average of population	object value

	// calculate average object value 
	sum=0.0;
	for (i=0; i<PopSize;i++) 
		sum+= population[i].value;
	average = sum/ PopSize;

	// print results of this population
	printf ("gen= %d,avg= %f,best= %f",generation, average, currentbest. value);
	printf ("chromosome=");
	for (i=0; i< CHROMLENGTH; i++)
	{
		printf ("%c",currentbest.chrom[i]);
	}
	printf ("\n");

}


