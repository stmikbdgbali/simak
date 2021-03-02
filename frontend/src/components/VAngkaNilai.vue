<template>  
    <v-text-field
        class="right-input"
        v-bind="$attrs"        
        @blur="onBlur"
        @focus="onFocus"
        @keydown="keyProcess"
        v-model.number="dataValue"
        v-on="$listeners">

    </v-text-field>  
</template>

<script>
import mixin from '@/plugins/ComponentWrappers'
export default {
    name: 'VAngkaNilai',
    mixins: [mixin],
    data: () => ({        
        fractDigitsEdited: false,
        fractPart: null,
        isFocused:false
    }),
    mounted()
    {
        var b = (this.dataValue + "").split(".");
        if (b.length> 0)
        {
            this.fractPart=b[1];
            this.fractDigitsEdited=true;
        }
        this.fractPart=b.length > 0 ? b[1]:null;        
    },
    methods: {
        clearValue()
        {
            this.dataValue = 0.00;
            this.fractPart = null;
            this.fractDigitsEdited = false;
        },
        setFocus(val)
        {
            this.isFocused=val;
        },
        onBlur() 
        {
            this.setFocus(false);            
        },
        onFocus() 
        {
            this.setFocus(true);            
        },
        keyProcess(keyEvent)
        {
            if (!this.isFocused) return;            

            if (keyEvent.key !== 'ArrowLeft' && keyEvent.key !== 'ArrowRight') {                           
                keyEvent.preventDefault();
            }

            keyEvent.stopPropagation();
            if (keyEvent.key === 'Enter') 
            {               
                return;
            } 
            else if (keyEvent.key === 'Delete') 
            {
                this.clearValue()
                return;
            }            
            const numericButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            let strVal = Math.trunc(this.dataValue).toString();

            if (numericButtons.includes(keyEvent.key)) 
            {
                if (this.fractDigitsEdited) 
                {
                    if (this.fractPart == null)
                    {
                        this.fractPart = keyEvent.key;
                    }                    
                    else if (this.fractPart.length <= 1)
                    {
                        this.fractPart += keyEvent.key.toString();
                    }                    
                }
                else
                {
                    strVal += keyEvent.key;                    
                }                
            } 
            else if (keyEvent.key === 'Backspace') 
            {
                if (this.fractDigitsEdited) 
                {
                    if (this.fractPart === null)
                    {
                        this.fractDigitsEdited=false;
                    }
                    else
                    {
                        this.fractPart = this.fractPart.length < 1 ? null : this.fractPart.substring(0, this.fractPart.length - 1);
                    }
                } 
                else 
                {
                    strVal = strVal.length <= 1 ? '0' : strVal.substring(0, strVal.length - 1);                   
                }
            }
            else if (['.'].includes(keyEvent.key)) 
            {
                this.fractDigitsEdited = !this.fractDigitsEdited;
            }            
            let result = this.fractPart==null?parseFloat(strVal).toFixed(2):parseFloat(strVal + '.' + this.fractPart).toFixed(2);
            if (result >=0.00 && result <= 100.00)
            {
                this.dataValue=result;
                this.$emit('input',this.dataValue);
            }            
        }
    },
}
</script>

<style scoped>
.right-input >>> input {
    text-align: right;
}
</style>
