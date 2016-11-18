<template>
    <div id="cat-modal" class="ui small modal">
        <i class="close icon"></i>
        <div class="header">
            Add a new category
        </div>
        <div class="content">
            <form class="ui form">
                <div class="field">
                    <label>Category Name</label>
                    <input v-model="catName" type="text" placeholder="Enter a category name..." />
                </div>
                <div class="field">
                    <label>Category Color</label>
                    <select v-model="catColor" class="ui simple dropdown">
                        <option value="">Select a color</option>
                        <option v-for="color in categoryColors
                            value='{{color}}'">
                            {{ capitalizeText(color) }}
                            </option>
                    </select>
                </div>
            </form>
        </div>
        <div class="actions">
            <div @click="addCategory" class="ui purple inverted button">Save</div>
        </div>
    </div>
</template>

<script>
    import store from '../store'
    import { capitalizeText } from '../filters'
    import Vue from 'vue'
    var eventHub = new Vue()

    export default {
        data () {
            return {
                catName: '',
                catColor: '',
                categoryColors: ['red', 'orange', 'yellow', 'olive', 'green',
                 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']
            }
        },
        methods: {
            addCategory () {
                var newCategory = {}
                newCategory[this.catName] = this.catColor
                store.addCategory(newCategory)
                $('#cat-modal').modal('hide')
            },
            capitalizeText
        },
        created: function () {
            eventHub.$on('add-category', function() {
                this.catName = this.catColor = ''
                $('#cat-modal').modal('show')
            })
        }
    }
</script>