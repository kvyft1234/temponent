#include <stdio.h>

int main(){
	int input[8];
	int result[4][8];
	int a,b,c,d,l,r,k=1;;
	for(a=0; a<8; a++){
		scanf("%d",&input[a]);
		result[0][a]=input[a];
	}
	
	c=0;
	for(a=1;a<16;a*=2){
		for(b=0;b<4/a;b++){
			l=0;
			r=0;
			for(d=0;d<2*a;d++){
				printf("before : %d %d %d %d %d\n",a,b,l,r,2*a*b+r+l);
				if((l<a) && (r<a)){
					if(result[c][2*a*b+l]<result[c][2*a*b+a+r]){
						result[c+1][2*a*b+l+r]=result[c][2*a*b+l];
						l++;
					}else{
						result[c+1][2*a*b+l+r]=result[c][2*a*b+a+r];
						r++;
					}
				}else{
					if(l<a){
						result[c+1][2*a*b+l+r]=result[c][2*a*b+l];
						l++;
					}else if(r<a){
						result[c+1][2*a*b+l+r]=result[c][2*a*b+a+r];
						r++;
					}else{
						result[c+1][2*a*b+l+r]=result[c][2*a*b+a+r];
						l++;
						result[c+1][2*a*b+l+r]=result[c][2*a*b+a+r];
						r++;
					}
				}
			}
		}
		c++;
	}
	for(a=0;a<4;a++){
		for(b=0;b<8;b++){
			printf("%d ",result[a][b]);
		}
		printf("\n");
	}
	
	return 0;
}
