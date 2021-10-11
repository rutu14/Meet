<template>
    <div >
        <transition name="modal">
        <div class="modal-mask ">
            <div class="modal-wrapper">
                <div class="modal-dialogs" role="document">
                    <div class="modal-content ">
                        <div class="row">							
							<div class="col lead text-center pt-2 ml-5">View Members</div>
							<div class="col-md-auto "></div>
							<div class="col col-lg-2 pt-2 mr-2">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true" @click="$emit('close')">✖</span>
								</button>
							</div>
						</div>
                        <div class="modal-body">
                            <span class="badge lead" v-for="members in teams.members" :key="members.id">
                                {{members.email}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'ViewMembers',
    title: 'View Team Members',
    props:{
        teams:{
            type: Array
        }
    }
};

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
template{
    font-family: 'Montserrat', sans-serif;
    background-color: #EDE9FE;    
    color: #3b3952;
}
*{
    font-family: 'Montserrat', sans-serif;
    line-height: 1.15;
}
.close{
	font-size: 1rem;
}
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.2);
	display: table;
	transition: opacity .3s ease;
}
.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}
.modal-dialogs{
	max-width: 50%;
    margin: auto;
    max-height: 80%;
}
.badge{
    background-color:#EDE9FE;
    margin: 2px 2px;
	font-size: 0.95rem;
    font-weight: 400;
}

</style>
